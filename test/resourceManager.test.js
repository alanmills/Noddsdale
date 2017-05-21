const assert = require('assert'),
    sinon = require('sinon'),
    resourceManager = require('../src/resourceManager');

const testSource = {
    'testModule': {
        'firstResource': 'firstValue',
        'secondResource': 'secondValue'
    }
};

describe('Resource Manager:', () => {
    describe('Get Resource String:', () => {
        before(() => {
            resourceManager.setSource(testSource);
        });

        after(() => {
            resourceManager.setSource(undefined);
        });

        it('Get testModule, firstResource string', () => {
            assert.equal(resourceManager.getString('testModule', 'firstResource'), testSource.testModule.firstResource);
        });

        it('Get testModule, secondResource string', () => {
            assert.equal(resourceManager.getString('testModule', 'secondResource'), testSource.testModule.secondResource);
        });

        it('Should return undefined for an invalid resource', () => {
            assert.equal(resourceManager.getString('testModule', 'invalidResource'), undefined);
        });

        it('Should return undefined for an invalid module', () => {
            assert.equal(resourceManager.getString('invalidModule', 'firstValue'), undefined);
        });

        it('Get testModule, [firstResource] string in array', () => {
            assert.equal(resourceManager.getString('testModule', ['firstResource']), testSource.testModule.firstResource);
        });
    });

    describe('Resource Source:', () => {
        it('Should return undefined if getting a resource string from an undefined source', () => {
            assert.equal(resourceManager.getString('testModule', 'firstResource'), undefined);
        });
    });
});