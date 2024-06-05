import { Button, Form, Input } from 'antd'
import './App.css'
import { generate, generateImg } from './utils/langchain';
import { useState } from 'react';

type FieldType = {
  text?: string;
  image?: string;
};

function App() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const onTextFinish = async (values: FieldType) => {
    const data = await generate(values.text!);
    // setText(data);
  };

  const onImgFinish = async (values: FieldType) => {
    const data = await generateImg(values.image!);
    // console.log(data);
    // setImage(data);
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
            <Button type="primary" htmlType="submit">
              生成
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="text-box">
              {text}
            </div>
          </Form.Item>
        </Form>
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
            <Button type="primary" htmlType="submit">
              生成
            </Button>
          </Form.Item>
        </Form>
        <img src={image} alt="" />
      </div>
    </div>
  )
}

export default App
