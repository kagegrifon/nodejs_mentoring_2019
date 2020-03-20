"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var groups_1 = require("../../interfaces/groups");
exports.groupMocks = [
    {
        "name": "administartors",
        "permissions": [
            groups_1.Permission.READ,
            groups_1.Permission.WRITE,
            groups_1.Permission.DELETE,
            groups_1.Permission.SHARE,
            groups_1.Permission.UPLOAD_FILES,
        ]
    },
    {
        "name": "managers",
        "permissions": [
            groups_1.Permission.READ,
            groups_1.Permission.WRITE,
            groups_1.Permission.SHARE,
            groups_1.Permission.UPLOAD_FILES,
        ]
    },
    {
        "name": "users",
        "permissions": [
            groups_1.Permission.READ,
            groups_1.Permission.WRITE,
            groups_1.Permission.SHARE,
        ]
    },
];
//# sourceMappingURL=mockGroups.js.map