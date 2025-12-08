
export const translations = {
  zh: {
    appName: "缺啥补啥",
    adminRole: "管理员",
    guestRole: "游客",
    userRole: "用户",
    newArrivals: "最新上架",
    addToCart: "加入购物车",
    outOfStock: "暂时缺货",
    stockLeft: "库存",
    welcomeTitle: "欢迎来到 缺啥补啥",
    welcomeDesc: "全网最全数字商品，USDT (TRC-20) 自动结算，极速发货。",
    adText: "[广告] 点击加入我们的 VIP 交流群",
    readMore: "阅读更多",
    readLess: "收起",
    
    // Sorting
    sortBy: "排序",
    sortDefault: "默认",
    sortPriceAsc: "价格: 低 → 高",
    sortPriceDesc: "价格: 高 → 低",
    sortNameAsc: "名称: A → Z",
    sortNameDesc: "名称: Z → A",

    // Share
    shareMsg: "🔥 缺啥补啥好物推荐：",
    
    // Purchase & Delivery Guide
    guideTitle: "购物指南",
    howToBuy: "如何购买",
    howToBuyDesc: "加入购物车 ➜ 转账 USDT ➜ 提交 TxID",
    deliveryMethod: "取货方式",
    deliveryMethodDesc: "系统核销后，Bot 自动发送卡密或文件。",

    // Admin Actions
    deleteProduct: "下架",
    confirmDelete: "确定要下架该商品吗？此操作无法撤销。",
    
    // Admin Panel
    adminDashboard: "管理员控制台",
    clickToUpload: "点击上传图片",
    prodName: "商品名称",
    prodPrice: "价格 (USDT)",
    prodStock: "库存数量",
    prodDesc: "商品描述",
    addProduct: "上架商品",
    productAdded: "商品已上架！",
    fileTooLarge: "文件过大，最大 500MB",
    invalidStock: "库存必须是大于或等于 0 的整数",
    
    // Cart & Checkout
    yourCart: "您的购物车",
    checkoutTitle: "TRC-20 收银台",
    totalAmount: "总金额",
    proceedPayment: "去支付",
    sendExactly: "请向以下地址准确转账",
    network: "网络：波场 (Tron / TRC-20)",
    walletAddress: "商户收款地址",
    iHavePaid: "我已支付，提交凭证",
    paymentConfirmed: "凭证已提交！系统将在 1-3 分钟内自动核销发货。",
    paymentAlert: "订单数据已生成 (演示模式)",
    
    // Payment Logic
    txIdLabel: "交易哈希 (TxID / Hash)",
    txIdPlaceholder: "粘贴 64 位交易哈希...",
    txIdRequired: "请输入有效的交易哈希",
    paste: "粘贴",
    copyToast: "已复制",
    
    // About Modal
    aboutTitle: "关于商场",
    aboutDesc: "缺啥补啥是一个基于 Telegram 的高端数字商品交易平台。我们提供全自动化的购物体验，24小时即时发货。",
    paymentMethod: "交易方式",
    paymentDetails: "本商场所有交易均使用 USDT (TRC-20) 网络。该方式安全、匿名且高效。请确保您的钱包支持波场网络转账。",
    contactUs: "联系我们",
    channelBtn: "加入官方频道",
    supportBtn: "联系人工客服",

    // Categories (Static examples)
    cat_Digital: "数字服务",
    cat_Sub: "订阅会员",
    cat_Edu: "教育资源",
    cat_General: "通用"
  },
  ko: {
    appName: "없는 게 없는 상점",
    adminRole: "관리자",
    guestRole: "방문자",
    userRole: "사용자",
    newArrivals: "최신 상품",
    addToCart: "장바구니 담기",
    outOfStock: "품절",
    stockLeft: "재고",
    welcomeTitle: "환영합니다!",
    welcomeDesc: "최고의 디지털 상품, USDT (TRC-20) 자동 결제, 즉시 배송.",
    adText: "[광고] VIP 커뮤니티 가입하기",
    readMore: "더 보기",
    readLess: "접기",

    // Sorting
    sortBy: "정렬",
    sortDefault: "기본",
    sortPriceAsc: "가격: 낮은순",
    sortPriceDesc: "가격: 높은순",
    sortNameAsc: "이름: A → Z",
    sortNameDesc: "이름: Z → A",

    // Share
    shareMsg: "🔥 추천 상품:",

    // Purchase & Delivery Guide
    guideTitle: "이용 안내",
    howToBuy: "구매 방법",
    howToBuyDesc: "장바구니 ➜ USDT 송금 ➜ TxID 제출",
    deliveryMethod: "수령 방법",
    deliveryMethodDesc: "입금 확인 후 봇이 자동으로 상품을 전송합니다.",

    // Admin Actions
    deleteProduct: "삭제",
    confirmDelete: "이 상품을 삭제하시겠습니까? 복구할 수 없습니다.",
    
    // Admin Panel
    adminDashboard: "관리자 대시보드",
    clickToUpload: "이미지 업로드 클릭",
    prodName: "상품명",
    prodPrice: "가격 (USDT)",
    prodStock: "재고 수량",
    prodDesc: "상품 설명",
    addProduct: "상품 등록",
    productAdded: "상품이 등록되었습니다!",
    fileTooLarge: "파일이 너무 큽니다 (최대 500MB)",
    invalidStock: "재고는 0 이상의 정수여야 합니다",
    
    // Cart & Checkout
    yourCart: "장바구니",
    checkoutTitle: "TRC-20 결제",
    totalAmount: "총 금액",
    proceedPayment: "결제하기",
    sendExactly: "아래 주소로 정확한 금액을 보내주세요",
    network: "네트워크: 트론 (Tron / TRC-20)",
    walletAddress: "지갑 주소",
    iHavePaid: "결제 완료 및 제출",
    paymentConfirmed: "제출되었습니다! 시스템이 1-3분 내에 확인하고 발송합니다.",
    paymentAlert: "주문 데이터 생성 (데모 모드)",

    // Payment Logic
    txIdLabel: "거래 해시 (TxID / Hash)",
    txIdPlaceholder: "64자리 거래 해시 붙여넣기...",
    txIdRequired: "유효한 거래 ID를 입력해주세요",
    paste: "붙여넣기",
    copyToast: "복사됨",

    // About Modal
    aboutTitle: "상점 소개",
    aboutDesc: "이곳은 텔레그램 기반의 프리미엄 디지털 상품 거래 플랫폼입니다. 24시간 자동 배송 시스템을 제공합니다.",
    paymentMethod: "결제 방식",
    paymentDetails: "모든 거래는 USDT (TRC-20) 네트워크를 사용합니다. 안전하고 빠르며 익명성이 보장됩니다. 트론 네트워크 송금을 지원하는지 확인해주세요.",
    contactUs: "문의하기",
    channelBtn: "공식 채널 입장",
    supportBtn: "고객센터 문의",

    // Categories
    cat_Digital: "디지털 서비스",
    cat_Sub: "구독 서비스",
    cat_Edu: "교육 자료",
    cat_General: "일반"
  }
};

export type TranslationKey = keyof typeof translations.zh;