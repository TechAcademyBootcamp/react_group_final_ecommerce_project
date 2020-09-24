from django.template import Library
from core.models import Category

register = Library()

@register.simple_tag
def get_categories(parent_id=None):
    if parent_id:
        return Category.objects.filter(parent_category__id=parent_id)
    return Category.objects.filter(parent_category__isnull=True)


@register.simple_tag
def check_container_is_big(parent_element):
    children = parent_element.sub_categories.filter(is_published=True)
    for child in children:
        if child.sub_categories.count() > 0:
            return True
    else:
        return False