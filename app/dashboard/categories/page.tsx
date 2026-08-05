'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Upload, Plus, Loader2, Image as ImageIcon, FolderPlus, Trash2, Edit2, Check, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  created_at: string;
}

interface CategoryImage {
  id: string;
  category_id: string;
  image_url: string;
  created_at: string;
}

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<CategoryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Category form state
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Image upload state
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Edit state
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editImageCategoryId, setEditImageCategoryId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

      // Fetch images
      const { data: imagesData, error: imagesError } = await supabase
        .from('category_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (imagesError) throw imagesError;
      setImages(imagesData || []);

    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load data. Make sure your database tables are created.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setIsAddingCategory(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name: newCategoryName.trim() }])
        .select();

      if (error) throw error;

      if (data) {
        setCategories([data[0], ...categories]);
        setNewCategoryName('');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to add category');
    } finally {
      setIsAddingCategory(false);
    }
  }

  async function handleUploadImage(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCategoryId || !selectedFile) {
      setError('Please select a category and an image file.');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // 1. Upload file to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${selectedCategoryId}/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('images')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // 3. Save to database
      const { data: insertData, error: insertError } = await supabase
        .from('category_images')
        .insert([{ category_id: selectedCategoryId, image_url: publicUrl }])
        .select();

      if (insertError) throw insertError;

      if (insertData) {
        setImages([insertData[0], ...images]);
        setSelectedFile(null);
        // Reset file input (hacky but works without ref for simplicity)
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }

    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm('Are you sure you want to delete this category and ALL its images? This cannot be undone.')) return;

    try {
      // 1. Get all images belonging to this category
      const categoryImages = images.filter(i => i.category_id === id);

      // 2. Delete each image file from Supabase Storage
      if (categoryImages.length > 0) {
        const storagePaths = categoryImages
          .map(img => {
            // Extract the path after the bucket name in the public URL
            // URL format: .../storage/v1/object/public/images/<path>
            const match = img.image_url.match(/\/storage\/v1\/object\/public\/images\/(.+)/);
            return match ? match[1] : null;
          })
          .filter(Boolean) as string[];

        if (storagePaths.length > 0) {
          const { error: storageError } = await supabase.storage
            .from('images')
            .remove(storagePaths);
          if (storageError) console.error('Storage delete error:', storageError);
        }
      }

      // 3. Delete all category_images DB records for this category
      const { error: imagesDbError } = await supabase
        .from('category_images')
        .delete()
        .eq('category_id', id);
      if (imagesDbError) throw imagesDbError;

      // 4. Delete the category itself
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;

      // 5. Update local state
      setCategories(categories.filter(c => c.id !== id));
      setImages(images.filter(i => i.category_id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete category');
    }
  }

  async function handleDeleteImage(id: string, imageUrl: string) {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      // 1. Extract the storage path from the public URL and delete from storage
      const match = imageUrl.match(/\/storage\/v1\/object\/public\/images\/(.+)/);
      if (match && match[1]) {
        const { error: storageError } = await supabase.storage
          .from('images')
          .remove([match[1]]);
        if (storageError) console.error('Storage delete error:', storageError);
      }

      // 2. Delete the DB record
      const { error } = await supabase.from('category_images').delete().eq('id', id);
      if (error) throw error;
      setImages(images.filter(i => i.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete image');
    }
  }

  async function handleUpdateCategory(id: string) {
    if (!editCategoryName.trim()) return;
    try {
      const { error } = await supabase
        .from('categories')
        .update({ name: editCategoryName.trim() })
        .eq('id', id);
      if (error) throw error;
      setCategories(categories.map(c => c.id === id ? { ...c, name: editCategoryName.trim() } : c));
      setEditingCategoryId(null);
    } catch (err: any) {
      setError(err.message || 'Failed to update category');
    }
  }

  async function handleUpdateImageCategory(id: string) {
    if (!editImageCategoryId) return;
    try {
      const { error } = await supabase
        .from('category_images')
        .update({ category_id: editImageCategoryId })
        .eq('id', id);
      if (error) throw error;
      setImages(images.map(i => i.id === id ? { ...i, category_id: editImageCategoryId } : i));
      setEditingImageId(null);
    } catch (err: any) {
      setError(err.message || 'Failed to update image category');
    }
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Content</h1>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FolderPlus className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleAddCategory} className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="New category name..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                disabled={isAddingCategory}
              />
              <button
                type="submit"
                disabled={isAddingCategory || !newCategoryName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2 font-medium"
              >
                {isAddingCategory ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Add
              </button>
            </form>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {categories.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No categories found. Add one above.</p>
              ) : (
                categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors">
                    {editingCategoryId === category.id ? (
                      <div className="flex items-center gap-2 flex-1 mr-2">
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button onClick={() => handleUpdateCategory(category.id)} className="text-green-600 hover:text-green-700 p-1">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingCategoryId(null)} className="text-gray-400 hover:text-gray-600 p-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="font-medium text-gray-700">{category.name}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { setEditingCategoryId(category.id); setEditCategoryName(category.name); }}
                            className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                            title="Edit category"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Upload className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Upload Image</h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleUploadImage} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  disabled={isUploading || categories.length === 0}
                >
                  <option value="">-- Choose a category --</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <p className="text-xs text-orange-500 mt-1">Please create a category first.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Choose Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors relative">
                  <div className="space-y-1 text-center">
                    {selectedFile ? (
                      <div className="text-sm text-gray-600 flex flex-col items-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-blue-500 mb-2" />
                        <span className="font-medium text-gray-900">{selectedFile.name}</span>
                        <span>({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label
                            htmlFor="image-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image-upload"
                              name="image-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                              disabled={isUploading}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                  {/* Invisible overlay for full area click */}
                  {!selectedFile && (
                    <label htmlFor="image-upload" className="absolute inset-0 cursor-pointer w-full h-full"></label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading || !selectedCategoryId || !selectedFile}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  'Upload Image'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <ImageIcon className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Uploaded Images</h2>
          </div>
          <span className="bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-sm font-medium">
            {images.length} Total
          </span>
        </div>

        <div className="p-6">
          {images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No images uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => {
                const category = categories.find(c => c.id === image.category_id);
                return (
                  <div key={image.id} className="group relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square">
                    <img
                      src={image.image_url}
                      alt={`Category: ${category?.name || 'Unknown'}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => { setEditingImageId(image.id); setEditImageCategoryId(image.category_id); }}
                          className="p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                          title="Change Category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.id, image.image_url)}
                          className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm"
                          title="Delete Image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {editingImageId === image.id ? (
                        <div className="bg-white p-2 rounded-lg text-xs flex gap-1 shadow-sm mt-auto">
                           <select 
                             value={editImageCategoryId} 
                             onChange={(e) => setEditImageCategoryId(e.target.value)}
                             className="flex-1 w-full border border-gray-300 rounded text-xs p-1 outline-none"
                           >
                             {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                           </select>
                           <button onClick={() => handleUpdateImageCategory(image.id)} className="text-green-600 hover:text-green-700 p-1 bg-gray-100 rounded"><Check className="w-3 h-3" /></button>
                           <button onClick={() => setEditingImageId(null)} className="text-red-600 hover:text-red-700 p-1 bg-gray-100 rounded"><X className="w-3 h-3" /></button>
                        </div>
                      ) : (
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg text-xs font-medium text-gray-800 shadow-sm truncate mt-auto">
                          {category?.name || 'Unknown Category'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
