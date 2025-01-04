
// 找service-iframe,
// 如果没找到了说明是在iframe中，进行评教
if (!document.querySelector('#service-iframe')) {
    console.log('在iframe中')
    main()
}

async function main() {
    // 由于每次评价完上次页面DOM会被消耗，所以需要每次都获取allList，而不能用for去遍历allList！！！
    while (true) {
        const wpList = document.querySelectorAll('uni-view.wp') // 未评
        const wwcList = document.querySelectorAll('uni-view.wwc') // 未完成
        const allList = [...wpList, ...wwcList]
        if (allList.length === 0) {
            alert('已完成评教')
            return
        }
        const firstClassElement = allList[0].parentElement.parentElement.parentElement
        console.log(firstClassElement)
        const kcpj = firstClassElement.querySelector('uni-view.box-hjjs-footer-kcpj')
        if (kcpj) {
            kcpj.click()
            await sleep(2000)
            if (document.querySelector('.box3-1')) {
                await evaluate()
            }
            else {
                document.querySelector('.header_left_back').click()
            }
            await sleep(1000)
        }
        const jspj = firstClassElement.querySelector('uni-view.box-hjjs-footer-jspj')
        if (jspj) {
            jspj.click()
            await sleep(500)
            document.evaluate("//uni-view[text()='评价']", document).iterateNext().click()
            await sleep(2000)
            await evaluate()
            await sleep(1000)
        }
        console.log("完成")
        await sleep(1500)
    }
}

// 使用此函数实现sleep休眠方式
async function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay))
}

// 打开评价页面后自动评价
async function evaluate() {
    // .box2-1列表
    const box2List = document.querySelectorAll('uni-view.box2-1');

    // .box2中倒数两个是输入，前面的全是选择
    for (let i = 0; i < box2List.length - 3; i++) {
        const uniListCellList = box2List[i].querySelectorAll('.uni-list-cell');
        uniListCellList[0].click()
    }
    // 不能全选“完全符合”，最后一个选“符合”，也就是第二个选项
    {
        const uniListCellList = box2List[box2List.length - 3].querySelectorAll('.uni-list-cell');
        uniListCellList[1].click()
    }

    //给最后两个输入“无”
    for (let i = box2List.length - 2; i < box2List.length; i++) {
        const textareaElement = box2List[i].querySelector('textarea.uni-textarea-textarea');
        const event = new InputEvent('input');
        textareaElement.value = "无";
        textareaElement.dispatchEvent(event);
    }

    // 提交
    document.querySelector('.box3-1').click()
    await sleep(1000)
    document.querySelector(".confirm.btn").click(); // 不知道为啥不行
}