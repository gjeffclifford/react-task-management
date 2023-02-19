import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import TaskForm from '@/components/TaskForm';
import BaseApi, {useRequest} from "@/lib/_base.api";
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const router = useRouter()
const { id } = router.query

const onSubmit = async (form: any) => {
  BaseApi.put(`${process.env.NEXT_PUBLIC_TASK_API}/v1/tasks/${id}`, form).then(() => {
    router.push('/')
  })
}

const { data: task, isValidating: rowsIsValidating } =
  useRequest(
    {
      url: `${
        process.env.NEXT_PUBLIC_TASK_API
      }/v1/tasks/${id}`,
    }
  );
  return (
    <>
      <TaskForm
        onSubmit={onSubmit}
        task={task}
      >

      </TaskForm>
    </>
  )
}
