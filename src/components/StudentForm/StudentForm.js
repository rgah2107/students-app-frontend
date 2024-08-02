import { Button, Form, Input, InputNumber } from 'antd'

const StudentForm = (props) => {
  const { form, studentData, onFinish, onFinishFailed } = props

  console.log({ studentData })
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: 'Please input the student name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: 'Please input the student last name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input the student email!',
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Age"
        name="age"
        rules={[
          {
            required: true,
            message: 'Please input the student age!',
            type: 'number',
            min: 1,
            max: 120,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Grade"
        name="grade"
        rules={[
          {
            required: true,
            message: 'Please input the student grade!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default StudentForm
