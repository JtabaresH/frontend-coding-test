import Image from 'next/image'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Profile({ data }) {
    const router = useRouter()
    const { register, handleSubmit } = useForm({
        useShouldNativeValidation: true,
    });
    const submit = (dataUpdate) => {
        axios
            .patch(`http://localhost:3001/tasks/${data.id}`,
                {
                    ...dataUpdate,
                    completed: Boolean(dataUpdate.completed),
                    endDate: dataUpdate.endDate === "" ? null : dataUpdate.endDate,
                })
            .then(() => router.push(`http://localhost:3000/profile/${data.personId}`))
    }
    return <div className="container text-center mt-3">
        <h4>Edit {data.title} information</h4>
        <form className="d-grid justify-content-center">
            {/* <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="picture"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Image URL</span>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={data.picture}
                    {...register('picture', {
                        required: 'Enter your full name here...'
                    })}
                />
            </div> */}
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="title"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Title</span>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={data.title}
                    {...register('title', {
                        required: 'Enter new title here...'
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
                    defaultValue={data.description}
                    {...register('description', {
                        required: 'Enter your description here...'
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
                        required: 'Select a status for the task...'
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
                    defaultValue={data.startDate}
                    {...register('startDate', {
                        required: 'Enter the Start Date here...'
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
                    defaultValue={data.endDate}
                    {...register('endDate')}
                />
            </div>
            <div className="input-group input-group-sm mt-3 justify-content-center">
                <button
                    className="btn btn-sm btn-success text-white"
                    onClick={handleSubmit(submit)}
                >
                    Update
                </button>
                <Link href={`http://localhost:3000/profile/${data.personId}`}>
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

export async function getServerSideProps(context) {
    const { query } = context
    const { id } = query
    const { data } = await axios.get(`http://localhost:3001/tasks/${id}`)
    return {
        props: {
            data
        }
    }
}
