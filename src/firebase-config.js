import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBT93w-gACdg8S0ELQrN3rhXdLe6yWfhsA',
  authDomain: 'forageopedia.firebaseapp.com',
  projectId: 'forageopedia',
  storageBucket: 'forageopedia.appspot.com',
  messagingSenderId: '741583257066',
  appId: '1:741583257066:web:eae3eae9095adccf264693',
  measurementId: 'G-M8ZBJKYD52',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
