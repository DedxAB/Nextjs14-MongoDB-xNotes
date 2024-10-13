import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Signin from '@/components/Signin/Signin'
import { BASE_URL } from '@/utils/constants'

export default async function SigninPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    return redirect('/')
  }

  return (
    <>
      <Breadcrumb className="mt-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={BASE_URL}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Signin</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Signin />
    </>
  )
}
