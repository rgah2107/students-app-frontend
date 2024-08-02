import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Flex, Form } from 'antd'
import { useState, useMemo, useEffect } from 'react'
import {
  useAddStudentMutation,
  useDeleteStudentMutation,
  useGetStudentsQuery,
  usePatchStudentMutation,
} from './services/api'

export default function useApp() {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  })
  const [actionInfo, setActionInfo] = useState(null)
  const { data, isLoading } = useGetStudentsQuery({
    page: tableParams.pagination?.current,
    size: tableParams.pagination?.pageSize,
  })

  const [deleteStudent] = useDeleteStudentMutation()
  const [patchStudent] = usePatchStudentMutation()
  const [createStudent] = useAddStudentMutation()

  const [form] = Form.useForm()

  const dataSource = useMemo(() => {
    if (!data) return []
    return data.students
  }, [data])

  useEffect(() => {
    if (!data) return
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        total: data.total
      },
    }))
  }, [data])

  useEffect(() => {
    if (!actionInfo) return
    form.resetFields()
    form.setFieldsValue(actionInfo?.studentData)
  }, [actionInfo, form, dataSource])

  const handleTableChange = (pagination) => {
    console.log({ pagination })
    setTableParams({
      pagination,
    })
  }

  const handleDeleteStudent = async (id) => {
    setActionInfo({ type: 'delete', id })
  }

  const handleEditStudent = (id) => {
    const studentData = { ...dataSource.find((item) => item._id === id) }
    setActionInfo({ type: 'edit', id, studentData })
  }

  const handleAddStudent = () => {
    setActionInfo({ type: 'create' })
  }

  const onFinish = async (values) => {
    if (actionInfo.type === 'create') {
      console.log('create', values)
      await createStudent(values)
    } else if (actionInfo.type === 'edit') {
      console.log('edit', values)
      await patchStudent({ id: actionInfo.id, data: values })
    }
    setActionInfo(null)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleCloseModal = () => {
    setActionInfo(null)
  }

  const handleOkModal = async () => {
    if (actionInfo.type === 'delete') {
      await deleteStudent(actionInfo.id)
    }
    setActionInfo(null)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (id) => (
        <Flex gap={10}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditStudent(id)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteStudent(id)}
          />
        </Flex>
      ),
    },
  ]

  const typeToTitleMap = {
    create: 'Create Student',
    edit: 'Edit Student',
    delete: 'Do you really want to delete the student',
  }

  return {
    form,
    columns,
    isLoading,
    dataSource,
    actionInfo,
    typeToTitleMap,
    tableParams,
    handleTableChange,
    handleOkModal,
    handleCloseModal,
    handleAddStudent,
    onFinish,
    onFinishFailed
  }
}
