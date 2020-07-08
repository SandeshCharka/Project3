import React from 'react';
import Avatar from 'components/common/Avatar';
import SideViewTemplate from 'components/layout/SideViewTemplate';
import './UserList.scss';

const UserList = ({ isActive, users }) => {
  console.log('UserList :', users);

  let result = [];
  users.map((user) => {
    result.push(<Item key={user.id} data={user} />);
  });

  return (
    <SideViewTemplate id="user-list" isActive={isActive}>
      <header>
        Participant List<span>({users.length})</span>
      </header>
      <ul>{result}</ul>
    </SideViewTemplate>
  );
};

const Item = ({ data }) => {
  return (
    <li>
      <span className="profile">
        <Avatar src={data.profileImage} alt={data.nickname} />
      </span>
      <p className="name">
        <span>{data.nickname}</span>
      </p>
    </li>
  );
};

export default UserList;
