import { 
  collection,
  doc, 
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// Collection reference
const GALLERIES_COLLECTION = 'galleries';

/**
 * Get all galleries
 * @param {string} type - Optional filter by type ('events' or 'newspaper')
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getGalleries = async (type = null) => {
  try {
    const galleriesRef = collection(db, GALLERIES_COLLECTION);
    let q;
    
    if (type) {
      q = query(galleriesRef, where('type', '==', type), orderBy('date', 'desc'));
    } else {
      q = query(galleriesRef, orderBy('date', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    
    const galleries = [];
    querySnapshot.forEach((doc) => {
      galleries.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: galleries };
  } catch (error) {
    console.error('Error getting galleries:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get single gallery by ID
 * @param {string} galleryId - The gallery's document ID
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const getGallery = async (galleryId) => {
  try {
    const galleryRef = doc(db, GALLERIES_COLLECTION, galleryId);
    const gallerySnap = await getDoc(galleryRef);
    
    if (gallerySnap.exists()) {
      return { 
        success: true, 
        data: {
          id: gallerySnap.id,
          ...gallerySnap.data()
        }
      };
    } else {
      return { success: false, error: 'Gallery not found' };
    }
  } catch (error) {
    console.error('Error getting gallery:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Add new gallery
 * @param {Object} galleryData - Gallery information
 * @param {string} galleryData.title - Gallery title
 * @param {string} galleryData.type - Gallery type ('events' or 'newspaper')
 * @param {string} galleryData.description - Gallery description
 * @param {string} galleryData.date - Gallery date (ISO string)
 * @param {Array} galleryData.images - Array of image objects with url and uploadedAt
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const addGallery = async (galleryData) => {
  try {
    // Validate required fields
    if (!galleryData.title || !galleryData.type) {
      return { success: false, error: 'Title and type are required' };
    }

    if (!galleryData.images || galleryData.images.length === 0) {
      return { success: false, error: 'At least one image is required' };
    }

    // Generate unique ID
    const galleryRef = doc(collection(db, GALLERIES_COLLECTION));
    
    const newGallery = {
      title: galleryData.title,
      type: galleryData.type,
      description: galleryData.description || '',
      date: galleryData.date || new Date().toISOString().split('T')[0],
      images: galleryData.images,
      imageCount: galleryData.images.length,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(galleryRef, newGallery);
    
    return { 
      success: true, 
      data: {
        id: galleryRef.id,
        ...newGallery
      }
    };
  } catch (error) {
    console.error('Error adding gallery:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update existing gallery
 * @param {string} galleryId - The gallery's document ID
 * @param {Object} galleryData - Updated gallery information
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const updateGallery = async (galleryId, galleryData) => {
  try {
    const galleryRef = doc(db, GALLERIES_COLLECTION, galleryId);
    
    // Check if gallery exists
    const gallerySnap = await getDoc(galleryRef);
    if (!gallerySnap.exists()) {
      return { success: false, error: 'Gallery not found' };
    }

    const updatedGallery = {
      ...galleryData,
      imageCount: galleryData.images?.length || 0,
      updatedAt: serverTimestamp()
    };
    
    await setDoc(galleryRef, updatedGallery, { merge: true });
    
    return { 
      success: true,
      data: {
        id: galleryId,
        ...updatedGallery
      }
    };
  } catch (error) {
    console.error('Error updating gallery:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete gallery
 * @param {string} galleryId - The gallery's document ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteGallery = async (galleryId) => {
  try {
    const galleryRef = doc(db, GALLERIES_COLLECTION, galleryId);
    
    // Check if gallery exists
    const gallerySnap = await getDoc(galleryRef);
    if (!gallerySnap.exists()) {
      return { success: false, error: 'Gallery not found' };
    }
    
    await deleteDoc(galleryRef);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get galleries by type
 * @param {string} type - Gallery type ('events' or 'newspaper')
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getGalleriesByType = async (type) => {
  return await getGalleries(type);
};

/**
 * Add image to existing gallery
 * @param {string} galleryId - The gallery's document ID
 * @param {Object} imageData - Image data with url and uploadedAt
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const addImageToGallery = async (galleryId, imageData) => {
  try {
    const galleryRef = doc(db, GALLERIES_COLLECTION, galleryId);
    const gallerySnap = await getDoc(galleryRef);
    
    if (!gallerySnap.exists()) {
      return { success: false, error: 'Gallery not found' };
    }

    const currentData = gallerySnap.data();
    const updatedImages = [...(currentData.images || []), imageData];

    await setDoc(galleryRef, {
      images: updatedImages,
      imageCount: updatedImages.length,
      updatedAt: serverTimestamp()
    }, { merge: true });

    return { success: true, data: { images: updatedImages } };
  } catch (error) {
    console.error('Error adding image to gallery:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Remove image from gallery
 * @param {string} galleryId - The gallery's document ID
 * @param {number} imageIndex - Index of image to remove
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const removeImageFromGallery = async (galleryId, imageIndex) => {
  try {
    const galleryRef = doc(db, GALLERIES_COLLECTION, galleryId);
    const gallerySnap = await getDoc(galleryRef);
    
    if (!gallerySnap.exists()) {
      return { success: false, error: 'Gallery not found' };
    }

    const currentData = gallerySnap.data();
    const updatedImages = (currentData.images || []).filter((_, index) => index !== imageIndex);

    await setDoc(galleryRef, {
      images: updatedImages,
      imageCount: updatedImages.length,
      updatedAt: serverTimestamp()
    }, { merge: true });

    return { success: true, data: { images: updatedImages } };
  } catch (error) {
    console.error('Error removing image from gallery:', error);
    return { success: false, error: error.message };
  }
};