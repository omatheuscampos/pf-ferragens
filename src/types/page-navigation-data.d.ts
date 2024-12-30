interface PageNavigationData extends NavigationData {
  sections: NavigationData[];
}

interface NavigationData {
  title: string;
  pathname: string;
}
