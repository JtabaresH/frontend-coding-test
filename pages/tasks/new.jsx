import Image from 'next/image'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/es'

export default function Profile({ persons }) {
    const router = useRouter()
    const { register, handleSubmit } = useForm({
        useShouldNativeValidation: true,
        defaultValue: { endDate: null }
    });
    const submit = (newTask) => {
        axios
            .post(`http://localhost:3001/tasks`,
                {
                    ...newTask,
                    endDate: newTask.endDate === "" ? null : newTask.endDate,
                    completed: newTask.completed === "true" ? true : false
                }
            )
            .then(() => router.push(`http://localhost:3000/profile/${newTask.personId}`))
    }
    return <div className="container text-center mt-3">
        <h4>Create New Task</h4>
        <form className="d-grid justify-content-center">
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="personId"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Assign to</span>
                <select
                    type='number'
                    className="form-select"
                    {...register('personId', {
                        required: 'Select a person...'
                    })}
                >
                    {persons.map((person) => <option value={person.id}>{person.fullName}</option>)
                    }
                </select>
            </div>
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="title"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Title</span>
                <input
                    type="text"
                    className="form-control"
                    {...register('title', {
                        required: 'Enter title of task...'
                    })}
                />
            </div>
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="description"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Description</span>
                <input
                    type="text"
                    className="form-control"
                    {...register('description', {
                        required: 'Enter the description of task...'
                    })}
                />
            </div>
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="completed"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Status</span>
                <select
                    className="form-select"
                    {...register('completed', {
                        required: 'Select the status...'
                    })}
                >
                    <option value={true}>Completed</option>
                    <option value={false}>Pending</option>
                </select>
            </div>
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="startDate"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Start Date</span>
                <input
                    type="date"
                    className="form-control"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    {...register('startDate', {
                        required: 'Enter the Start Date...'
                    })}
                />
            </div>
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="endDate"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >End Date</span>
                <input
                    type="date"
                    className="form-control"
                    {...register('endDate')}
                />
            </div>
            <div className="input-group input-group-sm mt-3 justify-content-center">
                <button
                    className="btn btn-sm btn-success text-white"
                    onClick={handleSubmit(submit)}
                >
                    Create
                </button>
                <Link href={`http://localhost:3000`}>
                    <button
                        className="btn btn-sm btn-danger text-white"
                    >
                        Cancel
                    </button>
                </Link>
            </div>
        </form>
    </div>
}


export async function getStaticProps() {
    const { data: persons } = await axios.get(`http://localhost:3001/people`)
    return {
        props: {
            persons
        }
    }
}