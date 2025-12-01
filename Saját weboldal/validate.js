(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    age: document.getElementById("age"),
    topic: document.getElementById("topic"),
    message: document.getElementById("message"),
    date: document.getElementById("date"),
  };

  const formMessage = document.getElementById("formMessage");

  const setError = (input, msg) => {
    clearError(input);
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");

    const p = document.createElement("p");
    p.className = "field-error";
    p.id = input.id + "-error";
    p.textContent = msg;

    const described = (input.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter(Boolean);
    described.push(p.id);
    input.setAttribute("aria-describedby", described.join(" "));

    const group = input.closest(".form-group") || input.parentElement;
    group.appendChild(p);
  };

  const clearError = (input) => {
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");

    const ids = (input.getAttribute("aria-describedby") || "").split(/\s+/);
    const keep = [];
    ids.forEach((id) => {
      if (!id) return;
      const el = document.getElementById(id);
      if (el && el.classList.contains("field-error")) {
        el.remove();
      } else if (id) {
        keep.push(id);
      }
    });
    if (keep.length) {
      input.setAttribute("aria-describedby", keep.join(" "));
    } else {
      input.removeAttribute("aria-describedby");
    }
  };

  const rules = {
    name(value) {
      if (!value.trim()) return "A név megadása kötelező.";
      if (value.trim().length < 3) return "A név legalább 3 karakter legyen.";
      // minimum két szó karakter (nem csak szóköz)
      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\\-'.\\s]{3,}$/.test(value))
        return "A név csak betűket és szóközt tartalmazzon.";
      return "";
    },

    email(value) {
      if (!value.trim()) return "Az e-mail megadása kötelező.";

      if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(value))
        return "Adj meg érvényes e-mail címet.";
      return "";
    },

    phone(value) {
      if (!value.trim()) return "A telefonszám megadása kötelező.";

      if (!/^[0-9 +()\\-]{7,}$/.test(value))
        return "Adj meg érvényes telefonszámot (min. 7 karakter).";
      return "";
    },

    age(value) {
      if (value === "" || value === null) return "Az életkor megadása kötelező.";
      const n = Number(value);
      if (!Number.isFinite(n)) return "Érvényes számot adj meg.";
      if (n < 18) return "18 év alatt nem tudunk szolgáltatást nyújtani.";
      if (n > 99) return "Kérjük, valós életkort adj meg (max. 99).";
      return "";
    },

    topic(value) {
      if (!value) return "Válassz egy témakört.";
      return "";
    },

    message(value) {
      if (!value.trim()) return "Az üzenet megadása kötelező.";
      if (value.trim().length < 20)
        return "Az üzenet legalább 20 karakter legyen (röviden írd le, miben segíthetünk).";
      return "";
    },

    date(value) {

      if (!value) return "";
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const chosen = new Date(value + "T00:00:00");
      if (chosen < today) return "Kérjük, jövőbeli dátumot válassz.";
      return "";
    },
  };

  const validateField = (input) => {
    const key = input.id;
    if (!rules[key]) return true; // nincs szabály → tekintsük jónak

    const error = rules[key](input.value);
    if (error) {
      setError(input, error);
      return false;
    }
    clearError(input);
    return true;
  };

  Object.values(fields).forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("change", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formMessage.className = "form-message";
    formMessage.textContent = "";

    Object.values(fields).forEach(clearError);

    const order = ["name", "email", "phone", "age", "topic", "message", "date"];
    let firstInvalid = null;
    let ok = true;

    order.forEach((k) => {
      const input = fields[k];
      if (!input) return;
      const good = validateField(input);
      if (!good && !firstInvalid) firstInvalid = input;
      ok = ok && good;
    });

    if (!ok) {
      formMessage.classList.add("error");
      formMessage.textContent = "Kérjük, javítsd a kiemelt mezőket.";
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    formMessage.classList.add("success");
    formMessage.textContent = "Köszönjük! Üzenetedet rögzítettük. Hamarosan jelentkezünk.";
    form.reset();
    
    Object.values(fields).forEach(clearError);
  });
})();
