import { Button, Form, Input, message } from 'antd'
import './App.css'
import { generate, generateImage } from './utils/langchain';
import { useState } from 'react';

type FieldType = {
  text?: string;
  image?: string;
};

function App() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [textL, setTextL] = useState(false)
  const [imgL, setImgL] = useState(false)

  const onTextFinish = async (values: FieldType) => {
    setTextL(true)
    const data = await generate(values.text!);
    setText(data);
    setTextL(false)
  };

  const onImgFinish = async (values: FieldType) => {
    setImgL(true)
    const data = await generateImage(values.image!).catch((err) => {
      message.error(err)
      setImgL(false)
    })
    data && setImage(data);
    setImgL(false)
  };

  return (
    <div className='box'>
      <div>
        <Form variant="filled"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onTextFinish} >
          <Form.Item
            label="文本"
            name="text"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={textL}>
              生成
            </Button>
          </Form.Item>
        </Form>
        <div className="text-box">
          {text}
        </div>
      </div>
      <div className='m-l'>
        <Form variant="filled"
          onFinish={onImgFinish} >
          <Form.Item
            label="图像"
            name="image"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={imgL}>
              生成
            </Button>
          </Form.Item>
        </Form>
        <div className="img-box">
          {image && <img src={image} alt="" />}
        </div>
      </div>
    </div>
  )
}

export default App
