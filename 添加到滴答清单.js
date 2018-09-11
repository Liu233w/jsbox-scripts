/*
 * 快速向滴答清单添加任务，可以同时编辑标题和内容
 *
 * 会自动把剪贴板内的文本设为标题，便于一键添加
 */

const submitButtonWidth = 80
const titleHeight = 32
const offset = 10

$ui.render({
  views: [
    {
      type: "view",
      props: {
        id: "titleBar"
      },
      layout: function (make, view) {
        make.top.inset(offset)
        make.height.equalTo(titleHeight)
        make.left.right.inset(offset)
      },
      views: [
        {
          type: "input",
          props: {
            type: $kbType.default,
            darkKeyboard: true,
            text: $clipboard.text,
            id: "title"
          },
          layout: function (make, view) {
            make.top.inset(0)
            make.height.equalTo(titleHeight)
            make.left.inset(0)
            make.right.inset(submitButtonWidth + offset)
          },
          events: {
            returned: submitItem
          }
        },
        {
          type: "button",
          props: {
            id: "submit",
            title: "到滴答清单",
            font: $font(12)
          },
          layout: function (make, view) {
            make.top.bottom.right.inset(0)
            make.width.equalTo(submitButtonWidth)
          },
          events: {
            tapped: submitItem
          }
        },
      ]
    },
    {
      type: "text",
      props: {
        type: $kbType.default,
        darkKeyboard: true,
        id: "content"
      },
      layout: function (make, view) {
        make.top.equalTo($("titleBar").bottom).offset(offset)
        make.bottom.right.left.inset(0)
      },
    }
  ]
})

function submitItem() {

  const title = $("title").text
  if (!title) {
    $ui.toast("请输入标题！", 3);
    return
  }

  const content = $("content").text || ""

  $app.openURL(`ticktick://x-callback-url/v1/add_task?title=${encodeURI(title)}&content=${encodeURI(content)}`);
}