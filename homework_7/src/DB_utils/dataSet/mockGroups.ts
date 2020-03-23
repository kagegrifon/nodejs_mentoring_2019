import { Permission } from '../../components/group/interfaces';

export const groupMocks = [
  {
    "name": "administartors",
    "permissions": [
      Permission.READ,
      Permission.WRITE,
      Permission.DELETE,
      Permission.SHARE,
      Permission.UPLOAD_FILES,
    ]
  },
  {
    "name": "managers",
    "permissions": [
      Permission.READ,
      Permission.WRITE,
      Permission.SHARE,
      Permission.UPLOAD_FILES,
    ]
  },
  {
    "name": "users",
    "permissions": [
      Permission.READ,
      Permission.WRITE,
      Permission.SHARE,
    ]
  },
];