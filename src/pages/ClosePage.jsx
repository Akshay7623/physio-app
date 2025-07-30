import { useEffect } from 'react'

const ClosePage = () => {
    useEffect(() => {
        window.close();
    }, [])
}

export default ClosePage