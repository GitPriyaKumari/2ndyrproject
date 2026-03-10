from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimeStampedModel):
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Author(TimeStampedModel):
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Student(TimeStampedModel):
    student_id = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=100)
    email_id = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)  # ⚠ Not recommended
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.student_id} - {self.full_name}"


class Book(TimeStampedModel):
    book_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    author = models.ForeignKey(Author, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)
    cover_image = models.ImageField(upload_to="book_covers/", blank=True, null=True)
    is_issued = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} - {self.book_id}"


class IssuedBook(TimeStampedModel):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    issued_at = models.DateTimeField(auto_now_add=True)
    returned_at = models.DateTimeField(null=True, blank=True)
    is_returned = models.BooleanField(default=False)
    fine = models.PositiveIntegerField(default=0)
    remark = models.TextField(blank=True)

    def __str__(self):
        return f"{self.book.title} - {self.student.student_id}"
