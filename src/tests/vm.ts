import { opnet, OPNetUnit } from '../opnet/unit/OPNetUnit.js';
import fs from 'fs';
import { BitcoinNetworkRequest, ContractManager } from '@btc-vision/op-vm';
import { Blockchain } from '../blockchain/Blockchain.js';

await opnet('VM', async (vm: OPNetUnit) => {
    /*await vm.it('should clear every contracts without hanging.', async () => {
        const fake: Address = Blockchain.generateRandomSegwitAddress();
        const toInstantiate: number = 200;

        const promises: Promise<void>[] = [];
        const contracts: OP_20[] = [];

        for (let i = 0; i < toInstantiate; i++) {
            const contract = new OP_20(`MyToken`, fake, 18);

            contracts.push(contract);
            promises.push(contract.init());
        }

        await Promise.all(promises);

        // Try to dispose all contracts
        for (let contract of contracts) {
            global.gc();
            contract.delete();
        }

        Assert.equal(contracts.length, toInstantiate);
    });*/

    await vm.it('should clear every contracts without hanging.', () => {
        //const fake: Address = Blockchain.generateRandomSegwitAddress();
        const toInstantiate: number = 10;
        const bytecode = fs.readFileSync('./bytecode/MyToken.wasm');

        const contractManager = new ContractManager(
            8,
            function () {
                throw new Error(`a`);
            },
            function () {
                throw new Error(`a`);
            },
            function () {
                throw new Error(`a`);
            },
            function () {
                throw new Error(`a`);
            },
            function () {
                throw new Error(`a`);
            },
            function () {
                throw new Error(`a`);
            },
            function () {
                throw new Error(`a`);
            },
            function () {
                throw new Error(`a`);
            },
        );

        const rndAddress = Blockchain.generateRandomSegwitAddress();

        for (let i = 0; i < toInstantiate; i++) {
            const start = Date.now();
            const contract = contractManager.reserveId();
            contractManager.instantiate(
                contract,
                rndAddress,
                bytecode,
                30000000n,
                BitcoinNetworkRequest.Regtest,
            );

            contractManager.destroyContract(contract);

            console.log('Contract instantiated!', contract, `Time: ${Date.now() - start}ms`);

            //contractManager.destroy(contract);

            /*const contract = new Contract(
                bytecode,
                30000000n,
                BitcoinNetworkRequest.Regtest,
                function () {
                    throw new Error(`a`);
                },
                function () {
                    throw new Error(`a`);
                },
                function () {
                    throw new Error(`a`);
                },
                function () {
                    throw new Error(`a`);
                },
                function () {
                    throw new Error(`a`);
                },
            );

            contract.destroy();*/

            console.log('DONE SYNC TASK');

            //promises.push(contract.init());
        }

        //for (let i = 1; i < 1000; i++) {
        //    contractManager.destroy(BigInt(i));
        //}

        //await Promise.all(promises);

        //Assert.equal(contracts.length, toInstantiate);
    });
});
