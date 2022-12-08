import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/es'

export default function Profile({ person, tasks }) {
    const router = useRouter()
    let fila = 1
    const CompleteTask = (id) => {
        axios
            .patch(`http://localhost:3001/tasks/${id}`, { completed: true, endDate: moment().format("YYYY-MM-DD") })
            .then(() => router.push(`http://localhost:3000/profile/${person.id}`))
    }
    const PendingTask = (id) => {
        axios
            .patch(`http://localhost:3001/tasks/${id}`, { completed: false, endDate: null })
            .then(() => router.push(`http://localhost:3000/profile/${person.id}`))
    }
    return <div className='container text-center mt-3'>
        <div className='d-flex justify-content-center'>
            <Link href={`/profile/${person.id}/edit`}>
                <button
                    className="btn btn-sm btn-primary"
                >Edit profile</button>
            </Link>
        </div>
        <h1>{person.fullName}</h1>
        <Image
            src={person.picture}
            width={100}
            height={150}
            alt="..."
        />
        <h6>Nickname: {person.nickname}</h6>
        <h6>Age: {person.age} - Gender: {person.gender}</h6>
        <h6>Occupation: {person.occupation}</h6>

        <h3 className="mt-3"> Tasks </h3>
        <table class="table table-responsive table-sm">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map((task) =>
                        person.id == task.personId && (
                            <tr>
                                <th scope="row">{fila++}</th>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.completed ? 'Completed' : 'Pending'}</td>
                                <td className="input-group">{!task.completed ?
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => CompleteTask(task.id)}
                                    >
                                        <i class="bi bi-toggle-off"></i>
                                    </button> :
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => PendingTask(task.id)}
                                    >
                                        <i class="bi bi-toggle-on"></i>
                                    </button>
                                }
                                    <Link href={`/tasks/${task.id}/edit`}>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            <i class="bi bi-arrow-clockwise"></i>
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                }
            </tbody>
        </table>
    </div >
}

export async function getServerSideProps(context) {
    const { query } = context
    const { id } = query
    const { data: person } = await axios.get(`http://localhost:3001/people/${id}`)
    const { data: tasks } = await axios.get(`http://localhost:3001/tasks`)
    return {
        props: {
            person,
            tasks
        }
    }
}
