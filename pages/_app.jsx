import Head from 'next/head'
import Link from 'next/link'
import '../styles/globals.css'
import "bootswatch/dist/cyborg/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
    return <>
        <Head>
            <title>TaskGestor</title>
            <link rel="icon" href="/favicon.ico" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"></link>
        </Head>
        <nav className="navbar sticky-top bg-dark">
            <div className="container-fluid d-flex justify-content-between gap-5">
                <Link href={`/profile/new`}>
                    <a
                        className="nav-link text-white"
                    >New profile</a>
                </Link>
                <Link href='/'>
                    <a className="nav-link text-white">
                        TaskGestor
                    </a>
                </Link>
                <Link href="http://localhost:3000/tasks/new">
                    <a
                        className="nav-link text-white"
                    >New Task
                    </a>
                </Link>
            </div>
        </nav>
        <Component {...pageProps} />
    </>
}

export default MyApp