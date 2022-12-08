import Image from 'next/image'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Profile() {
    const router = useRouter()
    const { register, handleSubmit } = useForm({
        useShouldNativeValidation: true,
    });
    const submit = (newPeople) => {
        axios
            .post(`http://localhost:3001/people`, {
                ...newPeople,
                age: Number(newPeople.age)
            })
    }
    return <div className="container text-center mt-3">
        <h4>Create New Profile</h4>
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
