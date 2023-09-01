/**
 * @openapi
 * /coin/getById/{id}:
 *   get:
 *     summary: get by id room
 *     tags: [COIN]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: format uuid
 *     responses:
 *       200:
 *        $ref: '#/components/responses/coinGetByIdResult'
 *       400:
 *        $ref: '#/components/responses/BadRequest'
 *       500:
 *        $ref: '#/components/responses/serverError'
 */
