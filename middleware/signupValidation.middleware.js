import { body, validationResult } from "express-validator";
import { checkDuplicateID } from "../models/signup.model.js";

export const signupValidation = async (req, res, next) => {
  try {
    const validationList = [
      body("passwordCheck").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }
        return true;
      }),
      body("tel").isMobilePhone("ko-KR").withMessage("유효하지 않은 전화번호입니다."),
      body("email").isEmail().withMessage("유효하지 않은 이메일입니다."),
    ];

    await Promise.all(validationList.map((validation) => validation.run(req)));
    const validationErr = validationResult(req);
    if (!validationErr.isEmpty()) {
      return res.status(400).send("유효한 값을 입력해주세요.");
    }

    const isDuplicate = await checkDuplicateID(req.body.id);
    if (isDuplicate.length !== 0) {
      return res.status(400).send("중복된 아이디입니다.");
    }
    next();
  } catch (err) {
    res.status(500).send();
  }
};
