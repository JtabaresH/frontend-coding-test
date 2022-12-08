import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'

export default function Home({ data }) {
  const [order, setOrder] = useState(true)
  return (
    <div className='container text-center'>
      <div className=" d-flex justify-content-center my-3">
        <button className='btn btn-sm btn-primary' onClick={() => setOrder(!order)}>Change order</button>
      </div>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {
          order ?
            data.sort((a, b) => {
              if (a.age < b.age) {
                return -1;
              }
            }).map((person) => <>
              <div className="col">
                <Link href={`/profile/${person.id}`}>
                  <div className="card mb-3 shadow-lg mx-auto" style={{ maxWidth: '350px', cursor: "pointer" }}>
                    <Image
                      src={person.picture}
                      width={100}
                      height={150}
                      alt="..."
                    />
                    <div className="card-body gap-0 p-1">
                      <h5 className="card-title">{person.fullName}</h5>
                      <p className="card-text text-white">Occupation: {person.occupation}</p>
                      <p className="card-text text-white">Age: {person.age}</p>
                    </div>
                  </div>
                </Link> <br />
              </div>
            </>
            )
            :
            data.sort((a, b) => {
              if (a.age > b.age) {
                return -1;
              }
            }).map((person) => <>
              <div className="col">
                <Link href={`/profile/${person.id}`}>
                  <div className="card mb-3 shadow-lg mx-auto" style={{ maxWidth: '350px' }}>
                    <Image
                      src={person.picture}
                      width={100}
                      height={150}
                      alt="..."
                    />
                    <div className="card-body gap-0 p-1">
                      <h5 className="card-title">{person.fullName}</h5>
                      <p className="card-text">Occupation: {person.occupation}</p>
                      <p className="card-text"><small className="text-muted">Age: {person.age}</small></p>
                    </div>
                  </div>
                </Link> <br />
              </div>
            </>
            )
        }
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await axios.get('http://localhost:3001/people')

  return {
    props: {
      data
    }
  }
}