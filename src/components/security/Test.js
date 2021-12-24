import {hasRole,isAllowed} from './authentication';


const user = {
  roles: ['user'],
  rights: ['can_view_articles']
};

const admin = {
  roles: ['user', 'admin'],
  rights: ['can_view_articles', 'can_view_users']
};

const Test = ({ user }) => (
  <div>
    {hasRole(user, ['user']) && <p>Is User</p>}
    {hasRole(user, ['admin']) && <p>Is Admin</p>}
    {isAllowed(user, ['can_view_articles']) && <p>Can view Articles</p>}
    {isAllowed(user, ['can_view_users']) && <p>Can view Users</p>}
  </div>
);

https://www.digitalocean.com/community/tutorials/react-simple-authorization