import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik, useFormik } from 'formik'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineUser,
    HiCheck,
} from 'react-icons/hi'
import * as Yup from 'yup'
import type { FormikProps, FieldInputProps, FieldProps } from 'formik'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import { useAppSelector } from '@/store'
import useAuth from '@/utils/hooks/useAuth'
import updateProfile from '@/utils/hooks/useUser'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useUser from '@/utils/hooks/useUser'
import { useState } from 'react'

export type ProfileFormModel = {
    id?: number
    name?: string
    lastName?: string
    email?: string
    profilePicture?: string,
    avatar?:  string
    foto?:  File
}

type ProfileProps = {
    data?: ProfileFormModel
}


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Minimo 6 caracteres')
        // .max(12, 'Too Long!')
        .required('Ingrese Nombre'),
    email: Yup.string().email('Email invalido').required('Ingrese Email'),
    lastName: Yup.string().required('Ingrese Apellido'),
    avatar: Yup.string(),

})

const Profile = (
{
    data = {
        id: useAppSelector((state) => state.auth.user.id),
        name: useAppSelector((state) => state.auth.user.firstName),
        lastName: useAppSelector((state) => state.auth.user.lastName),
        email: useAppSelector((state) => state.auth.user.email),
        avatar:useAppSelector((state) => state.auth.user.profilePicture)
    },
}: ProfileProps) => {
    const onSetFormFile = (
        form: FormikProps<ProfileFormModel>,
        field: FieldInputProps<ProfileFormModel>,
        files: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(files[0]))
        form.setFieldValue('foto', files[0])
    }
    
    const [message, setMessage] = useTimeOutMessage()

    const { updateProfile } = useUser()
    const onFormSubmit = async (
        values: ProfileFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        console.log('values', values)
        const {id, name, lastName, email, foto } = values
        setSubmitting(true)
        const result = await updateProfile({ id, firstName:name, lastName, email, foto  })
        if (result?.status === 'failed') {
            setMessage(result.message)
        }
        toast.push(<Notification title={'Perfil Actualizado'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false) 
    }

    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title="General"
                                desc="Información básica de contacto"
                            />
                             <FormRow
                                name="avatar"
                                label="Foto"
                                {...validatorProps}
                            >
                                <Field name="avatar">
                                    {({ field, form }: FieldProps) => {
                                        const avatarProps = field.value
                                            ? { src: field.value }
                                            : {}
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                showList={false}
                                                uploadLimit={1}
                                                onChange={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                            >
                                                <Avatar
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={60}
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>
                            <FormRow
                                name="name"
                                label="Nombre"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Name"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="lastName"
                                label="Apellido"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="lastName"
                                    placeholder="Apellido"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="email"
                                label="Email"
                                {...validatorProps}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                    prefix={
                                        <HiOutlineMail className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <div className="mt-4 ltr:text-right">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    type="button"
                                    onClick={() => resetForm()}
                                >
                                    Restablecer
                                </Button>
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? 'Actualizando' : 'Guardar'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile
