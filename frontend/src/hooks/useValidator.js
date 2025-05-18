import { useState, useEffect } from "react";

const useValidator = (options) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    const rules = options.rules.filter(
      (rule) => rule.selector === `[name="${name}"]`
    );
    if (rules.length === 0) return true;

    for (const rule of rules) {
      const error = rule.test(value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
        return false;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
    return true;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    options.rules.forEach((rule) => {
      const fieldName = rule.selector.match(/\[name="(.+?)"\]/)[1];
      const value = values[fieldName] || "";
      const error = rule.test(value);

      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      } else {
        newErrors[fieldName] = "";
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      if (typeof options.onSubmit === "function") {
        try {
          await options.onSubmit(values); // ĐÃ SỬA
        } finally {
          setIsSubmitting(false); // ĐÃ SỬA
        }
      }
    } else {
      setIsSubmitting(false); // ĐÃ SỬA
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setValues,
    setErrors,
  };
};

// Định nghĩa các rules
useValidator.isRequired = (selector, message) => ({
  selector,
  test: (value) =>
    value ? undefined : message || "Trường này không được bỏ trống",
});

useValidator.isEmail = (selector, message) => ({
  selector,
  test: (value) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value) ? undefined : message || "Email không hợp lệ";
  },
});

useValidator.isPhone = (selector, message) => ({
  selector,
  test: (value) => {
    const regex = /^(0[1-9][0-9]{8}|84[1-9][0-9]{8}|\+84[1-9][0-9]{8})$/;
    return regex.test(value)
      ? undefined
      : message || "Số điện thoại không hợp lệ";
  },
});

useValidator.minLength = (selector, min, message) => ({
  selector,
  test: (value) =>
    value.length >= min
      ? undefined
      : message || `Vui lòng nhập tối thiểu ${min} kí tự`,
});

useValidator.isConfirmed = (selector, getConfirmValue, message) => ({
  selector,
  test: (value) =>
    value === getConfirmValue()
      ? undefined
      : message || "Mật khẩu nhập lại không khớp",
});

export default useValidator;
