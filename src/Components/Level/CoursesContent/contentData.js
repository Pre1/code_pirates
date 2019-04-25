export const mdContentOne = `
## لماذا نتعلم HTML ؟

- *HTML* هي أساس كل لغات تطوير الويب.
- بدون *HTML* لن نستطيع التعامل مع النصوص والصور والفيديوهات على صفحات الويب.
- تعتبر *HTML* لغة وصفية لأنها تصف مكونات صفحات الويب عن طريق الوسوم *Tags*.
- *HTML* هي بداية رحلتك لتعلم برمجة صفحات ويب جذابة.


## ماهي الوسوم Tags ؟

الوسوم *Tags* هي مجموعة من العناصر يتم استخدامها للتأثير على محتوى صفحات الويب. 


## الهيكل العام لصفحات الويب

هكذا يبدو الهيكل العام لأي صفحة ويب على شبكة الانترنت.


\`\`\`html
<!DOCTYPE html>
<html>

    <head>
        <title>عنوان الصفحة</title>
    </head>

    <body>
        <p>أهلا وسهلا</p>
    </body>

</html>
\`\`\`
    
- يقوم الوسم *<DOCTYPE html!>* بتعريف نوع الصفحة ليسهل على المتصفح عرض صفحات HTML عرضا صحيحا.
- *<html> </html>* هو الوسم الرئيسي في كل صفحة ويب ويحتوي على جميع الوسوم *Tags* بداخله.
- الوسم *<head> </head>* يحتوي على معلومات عن صفحة الويب كما يحتوي بداخله على الوسم *<title> </title>* والذي يمثل عنوان الصفحة الذي يتم عرضه في المتصفح.
- الوسم *<title> </title>* يجب أن يكون مُضمّنا داخل وسم *<head> </head>*
- الوسم *<body> </body>* يحتوي على كل العناصر المعروضة في صفحة الويب، ويجب إضافة كل الوسوم التي نرغب بعرضها في الصفحة داخل هذا الوسم  كما فعلنا مع الوسم *<p></p>* في المثال السابق.
`;

export const mdContentTwo = `
## الوسم المخصص لكتابة العناوين على صفحات الويب

- يتم تعريف العناوين في صفحات الويب باستخدام الوسم *h* وإلحاقه برقم من *1* إلى *6*
- الوسم  *<h1>* هو أكبر مقاس للعناوين ويحدد العناوين الأكثر أهمية في الصفحة.
- الوسم  *<h6>* هو أصغر مقاس للعناوين ويحدد العناوين الأقل أهمية في الصفحة.
- يتم كتابة العناوين بين بداية فتح الوسم وإغلاقه كما في المثال التالي


\`\`\`html

<h1>العنوان 1</h1>

<h2>العنوان 2</h2>

<h3>العنوان 3</h3>

<h4>العنوان 4</h4>

<h5>العنوان 5</h5>

<h6>العنوان 6</h6>

\`\`\`
 
## ماهي أهمية العناوين:

- محركات البحث  (مثل جوجل *google* )  تستخدم العناوين لترتيب البنية الأساسية لمحتوى صحفات الويب.
- يفضل استخدام الوسمين *<h1> </h1>* و *<h2> </h2>* للعناوين الرئيسية .
- عند استخدامك للعناوين الأقل أهمية يفضل أن تستخدم أي من الوسوم بين *<h3> </h3>* إلى *<h6> </h6>*

`;

export const mdContentThree = `
## كيف يمكننا إدراج الصور في لفة HTML ؟

هذا سهل جدا يمكنك تحديد كيفية عرض الصور عن طريق الوسم *</ img>* كما في الشكل التالي

\`\`\`html

<img src="رابط الصورة"/>

\`\`\`



- لعرض الصورة داخل صفحتك تحتاج إلى تمرير السمة *src* بداخل وسم *</ img>* وهو اختصار لـ source أي حدد لي مصدر الصورة وامتدادها.
- تستطيع استخدام السمة *width* للتحكم في عرض الصورة.
- تستطيع استخدام السمة *height* للتحكم في طول الصورة.
- السمة *alt* تتيح لك كتابة نص ليظهر مكان الصورة في حال لم تظهر الصورة على صفحة الويب.
- السطر البرمجي التالي يوضح طريقة كتابة الوسم *</ img>* بأهم السمات الخاصة به.

\`\`\`html

<img src="coded.jpg" width="100px" height="100px" alt="معسكر طويق البرمجي"/>

\`\`\`

## كيف يتم عرض الصورة في المتصفح ؟

يقوم المتصفح بعرض الصورة التي أضفتها في المكان الموجود به وسم *</ img >* داخل ملف *html*، فإذا قمت بوضع *</ img >* بين فقرتين، فإن المتصفح سيعرض الفقرة الأولى ثم الصورة ثم الفقرة الثانية كما في المثال التالي.

\`\`\`html

<!DOCTYPE html>
<html>

    <head>
        <title>عنوان الصفحة</title>
    </head>

    <body>
        <p>الفقرة الأولى</p>
            <img src="tuwaik.svg" width="40%" alt="معسكر طويق البرمجي"/>
        <p>الفقرة الثانية</p>
    </body>

</html>

\`\`\`

ستظهر الصورة في صفحة الويب بالشكل التالي

`;
