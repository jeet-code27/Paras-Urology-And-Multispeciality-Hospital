import { 
  collection,
  doc, 
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// Collection reference
const EMPANELMENTS_COLLECTION = 'empanelments';

/**
 * Get all empanelments
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getEmpanelments = async () => {
  try {
    const empanelmentsRef = collection(db, EMPANELMENTS_COLLECTION);
    const q = query(empanelmentsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const empanelments = [];
    querySnapshot.forEach((doc) => {
      empanelments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: empanelments };
  } catch (error) {
    console.error('Error getting empanelments:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get single empanelment by ID
 * @param {string} empanelmentId - The empanelment's document ID
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const getEmpanelment = async (empanelmentId) => {
  try {
    const empanelmentRef = doc(db, EMPANELMENTS_COLLECTION, empanelmentId);
    const empanelmentSnap = await getDoc(empanelmentRef);
    
    if (empanelmentSnap.exists()) {
      return { 
        success: true, 
        data: {
          id: empanelmentSnap.id,
          ...empanelmentSnap.data()
        }
      };
    } else {
      return { success: false, error: 'Empanelment not found' };
    }
  } catch (error) {
    console.error('Error getting empanelment:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Add new empanelment
 * @param {Object} empanelmentData - Empanelment information
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const addEmpanelment = async (empanelmentData) => {
  try {
    // Generate unique ID
    const empanelmentRef = doc(collection(db, EMPANELMENTS_COLLECTION));
    
    const newEmpanelment = {
      ...empanelmentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(empanelmentRef, newEmpanelment);
    
    return { 
      success: true, 
      data: {
        id: empanelmentRef.id,
        ...newEmpanelment
      }
    };
  } catch (error) {
    console.error('Error adding empanelment:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update existing empanelment
 * @param {string} empanelmentId - The empanelment's document ID
 * @param {Object} empanelmentData - Updated empanelment information
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const updateEmpanelment = async (empanelmentId, empanelmentData) => {
  try {
    const empanelmentRef = doc(db, EMPANELMENTS_COLLECTION, empanelmentId);
    
    const updatedEmpanelment = {
      ...empanelmentData,
      updatedAt: serverTimestamp()
    };
    
    await setDoc(empanelmentRef, updatedEmpanelment, { merge: true });
    
    return { 
      success: true,
      data: {
        id: empanelmentId,
        ...updatedEmpanelment
      }
    };
  } catch (error) {
    console.error('Error updating empanelment:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete empanelment
 * @param {string} empanelmentId - The empanelment's document ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteEmpanelment = async (empanelmentId) => {
  try {
    const empanelmentRef = doc(db, EMPANELMENTS_COLLECTION, empanelmentId);
    await deleteDoc(empanelmentRef);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting empanelment:', error);
    return { success: false, error: error.message };
  }
};