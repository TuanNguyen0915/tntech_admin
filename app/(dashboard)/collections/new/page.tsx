import CollectionForm from '@/components/collections/CollectionForm'
import { Separator } from '@/components/ui/separator'

const NewCollectionPage = () => {
  return (
    <div className='w-full space-y-4 py-10 lg:px-10 px-4'>
      <h1 className='pageTitle'>Create Collection</h1>
      <Separator className='bg-gray-500' />
      <CollectionForm />
    </div>
  )
}

export default NewCollectionPage
