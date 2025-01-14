"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::global.global", ({ strapi }) => ({
  async find(ctx) {
    const { contentTypes } = strapi;
    const { attributes } = contentTypes['api::global.global'];

    const populateObject = Object.keys(attributes).reduce((acc, key) => {
      const attribute = attributes[key];

      // Kiểm tra nếu là component
      if (attribute.type === 'component') {
        // Lấy schema của component
        const componentAttributes = strapi.components[attribute.component].attributes;
        
        // Tạo mảng chứa tất cả media fields trong component
        const mediaFields = Object.keys(componentAttributes).filter(field => 
          componentAttributes[field].type === 'media'
        );

        // Nếu có media fields, thêm vào populate
        if (mediaFields.length > 0) {
          acc[key] = {
            populate: mediaFields
          };
        }
      } else if (['media', 'relation'].includes(attribute.type)) {
        acc[key] = true;
      }
      
      return acc;
    }, {});

    try {
      const entity = await strapi.entityService.findMany("api::global.global", {
        populate: populateObject
      });
      return entity;
    } catch (error) {
      ctx.throw(500, error);
    }
  }
}));


// "use strict";

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::global.global", ({ strapi }) => ({
//   async find(ctx) {
//     const { contentTypes } = strapi;
//     const { attributes } = contentTypes['api::global.global'];

//     const populateObject = Object.keys(attributes).reduce((acc, key) => {
//       // Xử lý đặc biệt cho seo và profile components
//       if (key === 'seo') {
//         acc[key] = {
//           populate: ['metaImage']
//         };
//       } else if (key === 'profile') {
//         acc[key] = {
//           populate: ['thumbnail'] // Populate media field 'thumbnail' trong profile
//         };
//       } else if (['component', 'media', 'relation'].includes(attributes[key].type)) {
//         acc[key] = true;
//       }
//       return acc;
//     }, {});

//     try {
//       const entity = await strapi.entityService.findMany("api::global.global", {
//         populate: populateObject
//       });
//       return entity;
//     } catch (error) {
//       ctx.throw(500, error);
//     }
//   }
// }));