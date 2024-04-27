'use strict';

/**
 * project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project',
({ strapi }) => ({
    /**
     * @param {{ query: any; }} ctx
     */
    async find(ctx) {
        const { query } = ctx;

        const entity = await strapi.entityService.findMany(
            "api::project.project",
            {
                ...query,
                populate: {
                   
                    MetaTag: true,
                },
            }
        );
        // @ts-ignore
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        // @ts-ignore
        return this.transformResponse(sanitizedEntity);
    },
}));
