import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import hooks from '@/components/ui/hooks'
import NewTaskField from './NewTaskField'
import { Field, Form, Formik, FieldProps } from 'formik'
import { HiCheck } from 'react-icons/hi'
import { components, MultiValueGenericProps, OptionProps } from 'react-select'
import {
    getMembers,
    putProject,
    toggleNewProjectDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import * as Yup from 'yup'
import Description from '../../../../../../../../Personal/react projects/Elstar - React Tailwind Admin Template/demo/src/views/ui-components/navigation/Steps/Description'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Alert, toast } from '@/components/ui'
import Notification from '@/components/ui/Notification'

type FormModel = {
    name: string
    description: string
    rut: string
    address: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').required('Title required'),
    rut: Yup.string().required('Title required'),
    address: Yup.string().required('Title required'),
})

const NewProjectForm = () => {
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState('')

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)

        const { name, description, rut, address } = formValue

        const values = {
            name: name,
            description: description,
            rut: rut,
            address: address,
        }
        dispatch(putProject(values))
        dispatch(toggleNewProjectDialog(false))
        toast.push(<Notification title="Empresa agregada" type="success" />, {
            placement: 'top-center',
        })
    }

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                rut: '',
                address: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values, setSubmitting)
            }}
        >
            {({ touched, errors, values }) => (
                <Form>
                    <FormContainer>
                        <FormItem
                            label="Nombre"
                            invalid={errors.name && touched.name}
                            errorMessage={errors.name}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="name"
                                placeholder="Ingrese nombre"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="RUT"
                            invalid={errors.rut && touched.rut}
                            errorMessage={errors.rut}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="rut"
                                placeholder="RUT"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Dirección"
                            invalid={errors.address && touched.address}
                            errorMessage={errors.address}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="address"
                                placeholder="Dirección"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Información adicional"
                            invalid={errors.description && touched.description}
                            errorMessage={errors.description}
                        >
                            <Field
                                textArea
                                type="text"
                                autoComplete="off"
                                name="description"
                                placeholder="Información adicional"
                                component={Input}
                            />
                        </FormItem>
                        {/* <NewTaskField onAddNewTask={handleAddNewTask} /> */}
                        <Button block variant="solid" type="submit">
                            Submit
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewProjectForm
