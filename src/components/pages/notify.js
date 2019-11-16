import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import StarsIcon from "@material-ui/icons/Stars";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "#fbfefe",
    backgroundImage:
      "linear-gradient(to right, #fff792 30%, #fef37f 52%,#ffef6d 100%)"
  },
  inline: {
    display: "inline"
  }
}));

export default function NotifyPage() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<>LỊCH THAY ĐỔI VÀ LƯU Ý TRONG TUẦN </>}
          secondary={
            <div style={{ fontSize: 16 }}>
              <Typography
                component="span"
                variant="h4"
                className={classes.inline}
                color="textPrimary"
              >
                14/11/2019
              </Typography>
              <br />
              1. 35 nghỉ thứ 7 bắt đầu từ tuần này. Lịch học mới chính thức từ
              tuần sau cố định T2 và T4 (16h15 - 18h15 hoặc 16h30 - 18h30).
              <br />
              <br />
              2. Thứ 4 tới, hết giờ học mẹ 35 ở lại trao đổi mục đàn với cô Nấm.
              Cô Nấm chú ý về nội dung nói với phụ huynh. Có gì thắc mắc liên hệ
              cô Hà.
              <br />
              <br />
              3. 33-41-48 sẽ chính thức ăn đũa từ hôm nay 14/11
              <br />
              <br />
              4. Tô là hoạt động sẽ chỉ làm sau giờ để tránh lãng phí thời gian.
              Nhưng là 1 mục quan trọng, các thầy cô song song cho sử dụng màu
              sáp và bút chì để cân đối. Tô màu bằng bút chì chính là bước chuẩn
              bị tiền tiểu học quan trọng cho trẻ. Ngoài tô, các thầy cô muốn bổ
              sung hoặc xen kẽ thêm gì tuỳ chỉnh. 33-41-45 -48. Chú ý đánh số
              trên sản phẩm.
              <br />
              <br />
              5. Thứ 2 18/11 tuần tới MS 51 - Huy 10 tuổi chính thức học tại lớp
              học
              <br />
              <br />
              6. Tuần mới cả lớp đón mừng tuần nhà giáo. Chú Duy sắp xếp mua hoa
              cả 3 tầng học cho tươi mới ❤ các thầy cô để ý cảnh quan lớp học
              đặc biệt là t1 trong những ngày này.
              <br />
              <br />
              7. Bất kể ngày thường phụ huynh cũng có thể bất chợt vào lớp như
              MS 45 tuần rồi. Nhà vệ sinh hay cảnh quan là cái mà phụ huynh đánh
              giá 1 phần lớp học. Cảm ơn cô Châu cô Nấm đã luôn giữ vệ sinh.
              Chúc thầy cô ngày tri ân nhà giáo với nhiều cảm xúc.
              <br />
              <br />
              <div style={{ textAlign: "center" }}>
                💐Thân mến và yêu thương💐 <br />
                Quản lí lớp học
                <br />
                Cô Hà siêu nhân
              </div>
            </div>
          }
        />
      </ListItem>
    </List>
  );
}
