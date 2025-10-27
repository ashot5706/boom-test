const express = require('express');
const searchController = require('../../controllers/search/search.controller');

const router = express.Router();

router.get('/', searchController.searchHouses);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: House search functionality
 */

/**
 * @swagger
 * paths:
 *  /search:
 *   get:
 *     summary: Search for houses in a specific city
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: City name to search houses in
 *         example: "Hollywood"
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *     responses:
 *       "200":
 *         description: Search completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Search completed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     listings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 391
 *                           listing_id:
 *                             type: string
 *                             example: "5dccefebd80c5000478bd6fb"
 *                           title:
 *                             type: string
 *                             example: "Renovated Apt -Unit #3 / Close to Beach w/ Parking"
 *                           pictures:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 sort:
 *                                   type: integer
 *                                 original:
 *                                   type: string
 *                                 thumbnail:
 *                                   type: string
 *                           picture:
 *                             type: string
 *                             example: "https://res.cloudinary.com/do4tedxg6/image/upload/v1720625854/tenants/DesignedVR/listings/Fillmore3/pictures/2lkX65_ryz403.png"
 *                           nickname:
 *                             type: string
 *                             example: "Fillmore #3"
 *                           beds:
 *                             type: number
 *                             example: 1.0
 *                           baths:
 *                             type: number
 *                             example: 1.0
 *                           city_name:
 *                             type: string
 *                             example: "Hollywood"
 *                           lat:
 *                             type: number
 *                             example: 26.0159185
 *                           lng:
 *                             type: number
 *                             example: -80.1163157
 *                           accommodates:
 *                             type: integer
 *                             example: 2
 *                           extra_info:
 *                             type: object
 *                           neighborhood:
 *                             type: string
 *                             nullable: true
 *                     pagi_info:
 *                       type: object
 *                       properties:
 *                         count:
 *                           type: integer
 *                           example: 99
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         per_page:
 *                           type: integer
 *                           example: 50
 *       "400":
 *         description: Bad request - city parameter missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "City parameter is required"
 *                 code:
 *                   type: integer
 *                   example: 400
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while searching houses"
 *                 code:
 *                   type: integer
 *                   example: 500
 */
