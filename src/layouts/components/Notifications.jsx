import React, { useState } from 'react';

import { Popover, Button, Badge, Card, Avatar } from 'antd';

import { BellOutlined } from '@ant-design/icons';

const { Meta } = Card;

const notificationsData = [
  { avatar: "https://joeschmoe.io/api/v1/random", title: "Notification 1", description: "This is description" },
  { avatar: "https://joeschmoe.io/api/v1/random", title: "Notification 2", description: "This is description" },
  { avatar: "https://joeschmoe.io/api/v1/random", title: "Notification 3", description: "This is description" },
]

const NotificationsDropDown = props => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      placement="bottomRight"
      classNames="global-notifications"
      visible={visible}
      onClick={() => setVisible(!visible)}
      content={
        <div
          style={{
            maxHeight: '600px',
            width: '400px',
            overflow: 'auto',
          }}
        >
          {notificationsData.map((notification, index) => (
            <Card bordered={false} hoverable className='notification-items' key={index}>
            <Meta
              avatar={<Avatar src={notification.avatar} />}
              title={notification.title}
              description={notification.description}
            />
            </Card>
          ))}
          <Button type="link" block>
            See all
          </Button>
        </div>
      }
      trigger="hover"
    >
      <Button
        type="primary"
        shape="circle"
        icon={<BellOutlined style={{ fontSize: '22px', marginLeft: '8px' }} />}
        size="large"
      >
        <Badge count={notificationsData.length} offset={[5, -18]}>
          <span className="head-example" />
        </Badge>
      </Button>
    </Popover>
  );
};

export default NotificationsDropDown;
