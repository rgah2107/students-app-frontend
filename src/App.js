import { Button, Modal, Table } from 'antd'
import useApp from './useApp'
import './App.css'
import StudentForm from './components/StudentForm/StudentForm'
import { UserAddOutlined } from '@ant-design/icons'

function App() {
  const {
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
  } = useApp()

  return (
    <div className="app-container">
      <div className="app-header">
        <span>Manage Students</span>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => handleAddStudent()}
        >
          Add New Student
        </Button>
      </div>
      <Table
        pagination={tableParams.pagination}
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        onChange={handleTableChange}
      />
      <Modal
        open={!!actionInfo}
        title={typeToTitleMap[actionInfo?.type] || 'Create Student'}
        okText="Yes"
        onOk={handleOkModal}
        onCancel={handleCloseModal}
        footer={actionInfo?.type !== 'delete' ? null : undefined}
      >
        {actionInfo?.type !== 'delete' && (
          <StudentForm
            form={form}
            type={actionInfo?.type}
            studentData={actionInfo?.studentData}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          />
        )}
      </Modal>
    </div>
  )
}

export default App
