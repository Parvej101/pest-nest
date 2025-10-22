import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // ডেভেলপমেন্ট মোডে, hot-reload-এর কারণে যাতে একাধিক কানেকশন তৈরি না হয়,
  // তার জন্য একটি গ্লোবাল ভেরিয়েবল ব্যবহার করা হচ্ছে।
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // প্রোডাকশন মোডে, ক্যাশিং-এর দরকার নেই।
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// পুরো মডিউল জুড়ে client promise-টি এক্সপোর্ট করা হচ্ছে।
export default clientPromise