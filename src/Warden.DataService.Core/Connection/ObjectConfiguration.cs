﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Serializers;
using Warden.DataModel.Entities;
using Warden.DataModel;

namespace Warden.DataService.Core.Connection
{
    public class ObjectConfiguration
    {
        public void mapObjects()
        {
            //if (!BsonClassMap.IsClassMapRegistered(typeof(IEntity)))
            //{
            //    BsonClassMap.RegisterClassMap<IEntity>(w =>
            //    {
            //        w.AutoMap();
            //        w.SetIdMember(w.GetMemberMap(c => c.Id));
            //        w.SetIgnoreExtraElements(true);
            //    });
            //}


            if (!BsonClassMap.IsClassMapRegistered(typeof(Site)))
            {
                BsonClassMap.RegisterClassMap<Site>(w =>
                {
                    w.AutoMap();
                    w.IdMemberMap.SetIdGenerator(CombGuidGenerator.Instance);                
                    w.SetIgnoreExtraElements(true);
                });
            }

            BsonSerializer.RegisterIdGenerator(typeof(Guid), CombGuidGenerator.Instance);

            // Represents a serializer for DateTimes to local. not stores dates as UTC  in MongoDB database
            BsonSerializer.RegisterSerializer(typeof(DateTime), new DateTimeSerializer(DateTimeKind.Local));
        }
    }
}