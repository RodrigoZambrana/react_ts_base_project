// import classNames from 'classnames'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
// import Tag from '@/components/ui/Tag'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { apiResetPassword } from '@/services/AuthService'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { AxiosError } from 'axios'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useAppSelector } from '@/store'
import { resetPassword } from '../../../../../../backend_base_project/src/controller/userController'
import useUser from '@/utils/hooks/useUser'
import { Alert } from '@/components/ui'

type PasswordFormModel = {
    // password: string
    newPassword: string
    confirmNewPassword: string
}

const validationSchema = Yup.object().shape({
    // password: Yup.string().required('Ingrese contraseña anterior'),
    newPassword: Yup.string()
        .required('Ingrese nueva contraseña ')
        .min(6, 'Mínimo 6 caracteres!')
        .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
    confirmNewPassword: Yup.string().oneOf(
        [Yup.ref('newPassword'), ''],
        'Contraseña y repetir contraseña no coinciden'
    ),
})

const Password = () => {
    const [resetComplete, setResetComplete] = useState(false)
    const [message, setMessage] = useTimeOutMessage()
    var id = useAppSelector((state) => state.auth.user.id)

    const { resetPassword } = useUser()
    const onFormSubmit = async (
        values: PasswordFormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        console.log('values', values)
        const { newPassword } = values
        setSubmitting(true)
        const result = await resetPassword({
            newPassword,
            id,
        })
        if (result?.status !== '200') {
            toast.push(
                <Notification
                    title={
                        'Error Code:' +
                        result?.status +
                        ' Error message:' +
                        result?.message
                    }
                    type="danger"
                />,
                {
                    placement: 'top-center',
                }
            )
        } else
            toast.push(<Notification title={result.message} type="success" />, {
                placement: 'top-center',
            })
        setSubmitting(false)
    }

    return (
        <>
            <Formik
                initialValues={{
                    // password: '',
                    newPassword: '',
                    confirmNewPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onFormSubmit(values, setSubmitting)
                    }, 1000)
                    resetForm({})
                }}
            >
                {({ touched, errors, isSubmitting, resetForm }) => {
                    const validatorProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <FormDesription
                                    title="Contraseña"
                                    desc="Cambio de contraseña"
                                />
                                {/* <FormRow
                                    name="password"
                                    label="Contraseña actual"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Contraseña actual"
                                        component={Input}
                                    />
                                </FormRow> */}
                                <FormRow
                                    name="newPassword"
                                    label="Nueva contraseña"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="newPassword"
                                        placeholder="Nueva contraseña"
                                        component={Input}
                                    />
                                </FormRow>
                                <FormRow
                                    name="confirmNewPassword"
                                    label="Confirmar contraseña"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="confirmNewPassword"
                                        placeholder="Confirmar contraseña"
                                        component={Input}
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
                                        {isSubmitting
                                            ? 'Actualizando'
                                            : 'Actualizar'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default Password
