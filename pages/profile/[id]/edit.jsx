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
            .patch(`http://localhost:3001/people/${data.id}`, {...dataUpdate, age: Number(data.age)})
            .then(() => router.push(`http://localhost:3000/profile/${data.id}`))
    }
    return <div className="container text-center mt-3">
        <h4>Edit {data.nickname} information</h4>
        <Image
            src={data.picture}
            width={100}
            height={100}
            alt="..."
        />
        <form className="d-grid justify-content-center">
            <div className="input-group input-group-sm mt-2">
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
            </div>
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="fullName"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Fullname</span>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={data.fullName}
                    {...register('fullName', {
                        required: 'Enter your full name here...'
                    })}
                />
            </div>
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="nickname"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Nickname</span>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={data.nickname}
                    {...register('nickname', {
                        required: 'Enter your nickname here...'
                    })}
                />
            </div>
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="gender"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Gender</span>
                <select
                    defaultValue={data.gender}
                    className="form-select"
                    {...register('gender', {
                        required: 'Select your gender...'
                    })}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="age"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Age</span>
                <input
                    type="number"
                    className="form-control"
                    defaultValue={data.age}
                    {...register('age', {
                        required: 'Enter your age...'
                    })}
                />
            </div>
            <div className="input-group input-group-sm mt-2">
                <span
                    htmlFor="occupation"
                    className="input-group-text"
                    style={{ width: '100px' }}
                >Occupation</span>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={data.occupation}
                    {...register('occupation', {
                        required: 'Enter your occupation here...'
                    })}
                />
            </div>
            <div className="input-group input-group-sm mt-3 justify-content-center">
                <button
                    className="btn btn-sm btn-success text-white"
                    onClick={handleSubmit(submit)}
                >
                    Update
                </button>
                <Link href={`http://localhost:3000/profile/${data.id}`}>
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
    const { data } = await axios.get(`http://localhost:3001/people/${id}`)
    return {
        props: {
            data
        }
    }
}
