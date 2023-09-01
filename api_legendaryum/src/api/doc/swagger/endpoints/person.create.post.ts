/**
 * @openapi
 * /person/create:
 *   post:
 *     summary: create Room and person
 *     tags: [PERSON]
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/personCreate'
 *     responses:
 *       201:
 *        $ref: '#/components/responses/personCreateResult'
 *       400:
 *        $ref: '#/components/responses/BadRequest'
 *       500:
 *        $ref: '#/components/responses/serverError'
 */
