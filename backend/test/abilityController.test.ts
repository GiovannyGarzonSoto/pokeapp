import httpMocks from 'node-mocks-http'
import {abilitiesController} from '../build/controllers/abilitiesController'
import Abilities from '../build/models/Abilities'

const allAbilities = require('./mocks/allAbilities')

jest.mock('../build/models/Abilities')

let req, res, next

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe('abilitiesController.listAll', () => {
    it('should be a function', () => {
        expect(typeof abilitiesController.listAll).toBe('function')
    })

    it('should call find method of model', async() => {
        await abilitiesController.listAll(req, res)
        expect(Abilities.find).toBeTruthy()
    })

    it('should return response 200 & all abilities', async() => {
        Abilities.find.mockReturnValue(allAbilities)
        await abilitiesController.listAll(req, res)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(allAbilities)
    })
})