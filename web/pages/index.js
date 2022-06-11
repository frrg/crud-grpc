
import dynamic from 'next/dynamic'

// Import code-generated data structures. 
const index = () => {
  const Book = dynamic(
    () => import('../component/Book'),
    { ssr: false }
  )

  return (
    <Book />
  )
}

export default index