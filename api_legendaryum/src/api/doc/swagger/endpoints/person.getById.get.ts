/**
 * @openapi
 * /person/getById/{id}:
 *   get:
 *     summary: get by id person
 *     tags: [PERSON]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: format uuid
 *     responses:
 *       200:
 *        $ref: '#/components/responses/personCreateResult'
 *       400:
 *        $ref: '#/components/responses/BadRequest'
 *       500:
 *        $ref: '#/components/responses/serverError'
 */
