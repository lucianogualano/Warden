﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Warden.DataModel.Entities
{
    public class UserEntity : EntityBase
    {
        public UserEntity()
        {
            UserRoles = new List<UserRoleEntity>();
        }
        public string Username { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }
        public bool IsLocked { get; set; }
        public DateTime DateCreated { get; set; }

        public virtual ICollection<UserRoleEntity> UserRoles { get; set; }
    }
}
