
import User from '@modules/v1/users/infra/data/entities/User';

const fakeUserId = '6b92c866-16d6-11ee-be56-0242ac120002';
const fakeJonhDoeId = '6b92c866-16d6-11ee-be56-0242ac120003';

const fakeUser = new User();
Object.assign(fakeUser, {
  id: fakeUserId,
  createdAt: new Date(),
  email: 'thiago.watanabe@umbrial@checkout.com',
  avatar: '/photo.png',
  bio: 'Backend Developer',
  name: 'Thiago Watanabe',
});

const fakeJonhDoe = new User();
Object.assign(fakeUser, {
  id: fakeUserId,
  createdAt: new Date(),
  email: 'thiago.watanabe@umbrial@checkout.com',
  avatar: '/photo.png',
  bio: 'Backend Developer',
  name: 'Thiago Watanabe',
});

export { fakeUser, fakeUserId, fakeJonhDoeId, fakeJonhDoe };
